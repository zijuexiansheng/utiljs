class ToggleLeftRight {
    constructor(left_dom, right_dom, storage_key) {
        /* left_dom and right_dom should have the following keys
            id: the parent id
            half_ratio: the ratio when both elements show
            full_ratio: the ratio when only that element shows
            call_back: the call back function when the corresponding arrow was clicked
        storage_key: can be either a key or null
        */
        this._left_dom = left_dom;
        this._right_dom = right_dom;
        this._storage_key = storage_key;
        this._current_state = 3;

        this._left_arrow =  this.build_arrow("left", left_dom.id, this.click_left_fn);
        this._right_arrow = this.build_arrow("right", right_dom.id, this.click_right_fn);

        if(this._current_state == 1)    this.hide_left;
        if(this._current_state == 2)    this.hide_right;
    }

    build_arrow(position, parent_id, click_func)
    {
        var arrow_dom = document.createElement("div");
        arrow_dom.id = "loon_toggle_" + position + "_" + parent_id;
        arrow_dom.className = "loon_toggle_" + position;
        var parent_dom = document.getElementById(parent_id);
        parent_dom.insertBefore( arrow_dom, parent_dom.firstChild );
        arrow_dom.addEventListener("click", click_func.bind(this));
        return arrow_dom;
    }

    show_both() {
        document.getElementById(this._left_dom.id).style["display"] = "block";
        document.getElementById(this._right_dom.id).style["display"] = "block";
        document.getElementById(this._left_dom.id).style["width"] = this._left_dom.half_ratio;
        document.getElementById(this._right_dom.id).style["width"] = this._right_dom.half_ratio;
        this._current_state = 3;
    }

    hide_left() {
        document.getElementById(this._left_dom.id).style["display"] = "none";
        document.getElementById(this._right_dom.id).style["display"] = "block";
        document.getElementById(this._right_dom.id).style["width"] = this._right_dom.full_ratio;
        this._current_state = 1;
    }

    hide_right() {
        document.getElementById(this._left_dom.id).style["display"] = "block";
        document.getElementById(this._right_dom.id).style["display"] = "none";
        document.getElementById(this._left_dom.id).style["width"] = this._left_dom.full_ratio;
        this._current_state = 2;
    }

    click_left_fn() {
        console.log("click left button: ");
        console.log(this);
        if(this._current_state == 3)        this.hide_left();
        else if(this._current_state == 2)   this.show_both();
        else    return;
        this.store_state();
        if(this._left_dom.hasOwnProperty("call_back"))
            this._left_dom.call_back();
    }

    click_right_fn() {
        console.log("click right button");
        if(this._current_state == 3)        this.hide_right();
        else if(this._current_state == 1)   this.show_both();
        else    return;
        this.store_state();
        if(this._right_dom.hasOwnProperty("call_back"))
            this._right_dom.call_back();
    }

    load_state() {
        if(null === this._storage_key)  return;
        this._current_state = localStorage.getItem(this._storage_key);
        if(null === this._current_state)
        {
            this._current_state = 3;
            this.store_state();
        }
    }

    store_state() {
        if(null === this._storage_key)  return;
        localStorage.setItem(this._storage_key, this._current_state);
    }
}
