/// <reference path="jquery.fitvids.ts"/>
/// <reference path="index.ts"/>
declare var $;
module blomp {

    /* Detect homepage with this */
    var HOMEPAGE_MARKER:string = "home-template";

    /* Meta data type */
    interface Metadata {
        summary:string;
        image:string;
    }

    /* Strip out meta tags from posts and process them as content */
    $(() => {
        $(".post p").each((i, e) => {
            var data = extract_meta_tags(e);
            if (data) {
                homepage_populate_meta_data(data, e);
            }
        });
    });

    /*
     * If this is the homepage, populate with meta data.
     */
    function homepage_populate_meta_data(data:Metadata, p:HTMLElement) {
        console.log("Populate!");
        if ($('body').attr('class') == HOMEPAGE_MARKER) {
            var $root = $(p).parent().parent();

            // Replace summary with an actual summary
            if (data.summary) {
                var $summary = $root.find(".post-excerpt");
                var $lines = $('<p></p>');
                $lines.html(data.summary);
                $summary.html('');
                $summary.append($lines);
            }

            if (data.image) {
                console.log("ImagE?");
                var $image = $("<img/>");
                $image.attr('src', data.image);
                $image.attr('class', 'post-image');
                $root.prepend($image);
            }
        }
    }

    /*
     * Does this block have any [meta:TAG] tags in it?
     * If so, extract them and return a match list.
     */
    function extract_meta_tags(p:HTMLElement):Metadata {
        var rtn:any = {};
        var text = p.innerHTML;
        var done = false;
        while (!done) {
            var offset = text.indexOf("[meta:");
            if (offset == -1) {
                done = true;
            }
            else {
                if (rtn == null) {
                    rtn = {};
                }
                var offset_end = text.indexOf("[/meta]");
                var data = text.substr(offset, offset_end);
                var bits = data.split(']');
                var name = bits[0].split(':')[1];
                data = bits[1].replace(/<[^>]*>/g, '');
                data = data.replace("[/meta", "");
                data = data.trim();
                rtn[name] = data;
                console.log(text);
                text = text.substr(0, offset) + text.substr(offset_end + 7);
                console.log('OUTPUT: ' + text);
            }
        }
        p.innerHTML = text;

        // All posts need an image; use place kitten as a default
        if (!rtn['image']) {
            var x = Math.floor(Math.random() * 100 + 100);
            var y = Math.floor(Math.random() * 100 + 100);
            rtn['image'] = "http://placekitten.com/"+x+"/"+y;
        }

        return <Metadata> rtn;

    }

}
