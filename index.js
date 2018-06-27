// @langenre Mar 27 2018
function memoize(fn) {
    let _cache = new Map(),
        _limit = 1000,
        _time = 1000*60*60*24
    
    function memoized(...args) {     
        const key = JSON.stringify(args)
        return get(key) || set(key, fn.apply(this, args))
    }
    
    //Set item limit of cache
    memoized.limit = function(limit) {
        if (typeof limit !== 'number')
            throw new TypeError()
        _limit = limit
        return this
    }
    
    //Set expire time of cache items in ms (refreshes all entries)
    memoized.expire = function(time) {
        if (typeof time !== 'number')
            throw new TypeError()
        _time = time
        return this
    }
    
    //Clear cache
    memoized.flush = function() {
        _cache.clear()
        return this
    }

    //Add item to cache (delete items if limit is exceeded or time is expired) 
    function set(key, value) {
        const entries = _cache.entries(),
              date = Date.now()

        while(true) {
            let entry = entries.next()
            if (entry.value && (_cache.size > _limit || entry.value[1].expire + _time < date))
                remove(entry.value[0])
            else 
                break
        }
        _cache.set(key, { value, expire: Date.now() })
        return value
    }

    //Returns item.value of given key (delete item if time is expired)
    function get(key) {
        const entry = _cache.get(key)
        if (entry) {
            if (entry.expire + _time > Date.now())
                return entry.value
            else
                remove(key)
        }
        return undefined
    }

    //Delete item of given key
    function remove(key) {
        _cache.delete(key)
        return this
    }

    if (fn instanceof Function)
        return memoized
    throw new TypeError()
}

module.exports = memoize