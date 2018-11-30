(function ($) {
    $.scrollPaginator = {
        defaults: {
            object_visibility: 'TOP',
            total_pages: 0,
            last_loaded_page: 1,
            request_next: true,
            visibilities: ['TOP', 'COMPLETE'],
            sample_element: $('<div id="sample_object" class="sample_object"></div>')
        }
    };

    var scrollPaginator = function (element, options) {
        var settings = $.extend(true, {}, $.scrollPaginator.defaults, options);

        buildSampleElement = function () {
            $(settings.sample_element)
                .height(element.height()).width(element.width())
                .attr('class', $(settings.sample_element).attr('class') + element.attr('class'));
        };

        provision = function () {
            settings.sample_element.attr('class', element.attr('class'));
            element.parent().append(settings.sample_element)
        };

        validVisibility = function () {
            $.inArray(settings.object_visibility, settings.visibilities)
        };

        increment_page = function () {
            settings.last_loaded_page += 1;
            if (settings.last_loaded_page >= settings.total_pages) {
                settings.last_loaded_page = settings.total_pages;
            }
        };

        decrement_page = function () {
            settings.last_loaded_page -= 1;
            if (settings.last_loaded_page <= 1) {
                settings.last_loaded_page = 1;
            }
        };

        activateOnScrollPagination = function () {
            $(window).unbind('scroll');
            $(window).bind('scroll', function () {
                loadItems();
            });
        };

        isSampleVisible = function () {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(settings.sample_element).offset().top;
            var elemBottom = elemTop + $(settings.sample_element).height();
            switch (settings.object_visibility) {
                case 'TOP':
                    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
                    break;
                case 'COMPLETE':
                    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                    break;
                default:
                    console.log('Visibility option is not valid.');
                    return false;
            }
        };

        loadItems = function () {
            if (isSampleVisible()) {
                if (settings.request_next) {
                    if (settings.last_loaded_page < settings.total_pages) {
                        increment_page();

                        /*--- For preventing multiple requests ---*/
                        settings.request_next = false;

                        $.ajax({
                            method: 'GET',
                            dataType: 'script',
                            url: settings.items_source_url + '?page=' + settings.last_loaded_page
                        }).success(function () {
                            settings.request_next = true;
                            loadItems();
                        }).fail(function () {
                            decrement_page();
                        });
                    } else {
                        settings.request_next = false;
                    }
                }
            }
        };

        enable = function () {
            buildSampleElement();
            provision();
            activateOnScrollPagination();
            loadItems();
        };

        enable();
    };

    $.fn.scrollPaginator = function (options) {
        var scroll_paginator = new scrollPaginator($(this), options);
        return this;
    };
}(jQuery));
