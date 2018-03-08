function back_to_top(id, placement)
{
    var data_placement = "left";
    if(placement == "left")
        data_placement = "right";

    var back_to_top_btn = document.createElement("a");

    var back_to_top_i = document.createElement("i");
    back_to_top_i.className = "fa fa-chevron-up fa-2x";
    back_to_top_i.setAttribute("aria-hidden", "true");

    back_to_top_btn.id = id;
    back_to_top_btn.href = "#";
    back_to_top_btn.className = "btn btn-primary";
    back_to_top_btn.setAttribute("role", "button");
    back_to_top_btn.setAttribute("title", "Go to the top page");
    back_to_top_btn.setAttribute("data-toggle", "tooltip");
    back_to_top_btn.setAttribute("data-placement", data_placement);
    back_to_top_btn.appendChild( back_to_top_i );
    document.body.appendChild(back_to_top_btn);

    back_to_top_btn.style.cursor = "pointer";
    back_to_top_btn.style.position = "fixed";
    back_to_top_btn.style.bottom = "20px";
    back_to_top_btn.style.borderRadius = "26px";
    back_to_top_btn.style.width = "53px";
    back_to_top_btn.style.height = "52px";
    back_to_top_btn.style.opacity="0.2";
    back_to_top_btn.style[ placement ] = "20px";
    back_to_top_btn.style.display = "none";
    back_to_top_btn.style.textDecoration = "none";

    back_to_top_btn.addEventListener("click", function(){
        $("#" + id).tooltip("hide");
        $("body,html").animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    var scroll_function = function() {
        if($(this).scrollTop() > 50)
            $("#" + id).fadeIn();
        else
            $("#" + id).fadeOut();
    }
    return scroll_function;
}
