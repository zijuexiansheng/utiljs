function floating_div(id, position, width, hide_width, at, distance, style_dict)
{
    var div = document.createElement('div');
    div.id = id;
    div.className = "floating-loon floating-" + position + "-loon";
    div.style.width = width;
    for(var style_key in style_dict)
    {
        div.style[ style_key ] = style_dict[ style_key ];
    }
    if(position == "left" || position == "right")
    {
        if(at == "top" || at == "bottom")
        {
            div.style[position] = "-" + hide_width;
            div.style[at] = distance;
        }
        else
            console.log("ERROR in floating_div(): position = left/right, but at != top/bottom");
    }
    else if(position == "top" || position == "bottom")
    {
        if(at == "left" || at == "right")
        {
            div.style[position] = "-" + hide_width;
            div.style[at] = distance;
        }
        else
            console.log("ERROR in floating_div(): position = top/bottom, but at != left/right");
    }
    else
    {
        alert("ERROR in floating_div(): position != top/bottom/left/right");
    }
    return div;
}

function floating_combo(id, position, width, hide_width, at, distance, btn_ids, btn_texts = false, style_dict={})
{
    var combo = floating_div(id, position, width, hide_width, at, distance, style_dict);
    for(var i = 0; i < btn_ids.length; ++i)
    {
        var btn = document.createElement("div");
        var anchor = document.createElement("a");
        anchor.href = "#";
        anchor.id = btn_ids[ i ];
        if(typeof btn_texts == 'string')
            anchor.innerHTML = btn_texts;
        else if(typeof btn_texts == 'object')
            anchor.innerHTML = btn_texts[i];
        btn.appendChild( anchor );
        combo.appendChild( btn );
    }
    document.body.appendChild(combo);
}

function floating_btn(id, position, width, hide_width, at, distance, text, style_dict={})
{
    var div = floating_div(id, position, width, hide_width, at, distance, style_dict);
    div.innerHTML = text;
    document.body.appendChild(div);
}
