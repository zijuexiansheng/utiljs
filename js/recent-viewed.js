class RecentViewed {
    constructor(view_key) {
        /*The key to store recent viewed contents*/
        this._key = view_key;
        this._keep_n = 10;
    }

    compare_func(a, b) {
        return b[1] - a[1];
    }

    load() {
        var ret = localStorage.getItem(this._key);
        if(null === ret)    return [];
        var ret_dict = JSON.parse(ret);
        ret = [];
        for(var id in ret_dict)
            ret.push([id, ret_dict[id].tm, ret_dict[id].content]);
        ret.sort(this.compare_func);
        return ret.slice(0, this._keep_n);
    }

    record(id, content) {
        var data = localStorage.getItem(this._key);
        if(null === data)   data = {};
        else    data = JSON.parse(data);

        data[id] = {"tm": new Date().getTime(),
                    "content": content}
        if(data.length > 50)
            this.trim_data( data );
        localStorage.setItem(this._key, JSON.stringify(data));
    }

    trim_data(data) {
        var tm_array = [];
        for(var id in data)
            tm_array.push( data[id].tm );
        tm_array.sort();
        var pivot_tm = tm_array[tm_array.length - this._keep_n];
        for(var id in data)
        {
            if(data[id].tm < pivot_tm)
                delete data.id;
        }
    }
}
