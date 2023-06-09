const fs = require('fs');
const {resolve} = require('path');
const dataMap = {
    person: './person.json',
    person2: './person2.json',
}
const cacheMap = {};
const cacheUseList = [];
const cacheControl = {
    // max: 10 * 1024 * 1024, // 10MB
    max: 0.001 * 1024 * 1024, // 1 KB
    current: 0 //
}
// 监听文件
watchCacheFile();

function watchCacheFile() {
    Object.keys(dataMap).forEach(key => {
        const path = resolve(__dirname, dataMap[key]);
        cacheMap[key] = {
            path,
            data: null,
            size: fs.statSync(path).size,
        }

        fs.watchFile(path, (curr, pre) => {
            // cacheMap[key].size = curr.size / 1024;
            cacheMap[key].size = curr.size;
            cacheControl.current += curr.size - pre.size;
            console.log(path, cacheControl.current, ' watch file :...')
            checkCache();
        })
    })
}

function getCache(tableName) {
    const cache = cacheMap[tableName];
    if (!cache) {
        throw new Error('表名不存在: ' + tableName);
    }
    // 基于最近使用优先原则，更新缓存使用栈
    const cacheUseIndex = cacheUseList.indexOf(tableName);
    if (cacheUseIndex !== -1) {
        cacheUseList.splice(cacheUseIndex, 1);
    }
    cacheUseList.unshift(tableName);

    // 首次读取、缓存被清除时，重新读取缓存：
    if (!cache.data) {
        console.log('read file ....')
        // 更新已用缓存大小
        cacheControl.current += cache.size;
        // 更新换信息
        const dataStr = fs.readFileSync(cache.path, {encoding: 'utf-8'});
        const newCache = JSON.parse(dataStr);
        cache.data = newCache;
        checkCache();
    }
    console.log('read cache ....')
    console.log('use list: ', cacheUseList.join('<-'))
    return cache;
}

function updateCache(tableName, data = []) {
    const cache = getCache(tableName);
    cache.data = data;
    fs.writeFileSync(cache.path, JSON.stringify(data));
    return getCache(tableName);
}

// 缓存溢出时，清除缓存使用栈最后一位数据
function checkCache() {
    console.log('check cache ....', cacheControl.current);
    const {max} = cacheControl;
    while (max > 0 && cacheUseList.length > 1 && (cacheControl.current > max)) {
        console.log('缓存溢出：...');
        const removeKey = cacheUseList.pop();
        const removeCache = cacheMap[removeKey];
        cacheControl.current -= removeCache.size;
        removeCache.data = null;
        console.log('清除：', removeKey);
    }
}

function getData(tableName) {
    console.log('get: ', tableName);
    return getCache(tableName).data;
}

function addData(tableName, data = []) {
    console.log('add: ', tableName);
    if (!data.length) {
        return;
    }
    const cache = getCache(tableName).data;
    let latestId = cache[cache.length - 1].id;
    data.forEach(e => {
        e.id = ++latestId;
    })
    const newCache = [...cache, ...data];
    return updateCache(tableName, newCache);
}

function modifyData(tableName, data) {
    console.log('modify: ', tableName);
    if (!data.length) {
        return;
    }
    const cache = getCache(tableName).data;
    data.forEach(e => {
        const matchData = cache.find(old => old.id === e.id);
        if (matchData) {
            // TODO 过滤key
            Object.assign(matchData, e);
        }
    })
    const newCache = cache;
    return updateCache(tableName, newCache);
}

function removeData(tableName, data) {
    console.log('remove: ', tableName);
    if (!data.length) {
        return;
    }
    const cache = getCache(tableName).data;
    const newCache = cache.filter(e => !data.includes(e.id));
    return updateCache(tableName, newCache);
}


module.exports = {
    getData,
    addData,
    modifyData,
    removeData
}
