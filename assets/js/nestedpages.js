jQuery(function(t){function e(e){var n=t(e.placeholder).parents("ol").length,i=t(".sortable").width(),o=40*n-40,s=i-o;t(e.placeholder).width(s).css("margin-left",o+"px"),a(e)}function a(e){var a=t(e.placeholder).parent("ol");t(a).is(":visible")||t(a).show()}function n(){t(".child-toggle").each(function(){var e=t(this).parent(".row").parent("li");if(t(e).children("ol").length>0){var a=t(e).children("ol:visible").length>0?"np-icon-arrow-down":"np-icon-arrow-right";t(this).html('<a href="#"><i class="'+a+'"></i></a>')}else t(this).empty()})}function i(){t("#np-error").hide(),t("#nested-loading").show(),list=t("ol.sortable").nestedSortable("toHierarchy",{startDepthCount:0}),t.ajax({url:ajaxurl,type:"post",datatype:"json",data:{action:"npsort",nonce:nestedpages.np_nonce,list:list},success:function(e){"error"===e.status?(t("#np-error").text(e.message).show(),t("#nested-loading").hide()):(t("#nested-loading").hide(),console.log(e))}})}function o(e){var a={id:t(e).attr("data-id"),title:t(e).attr("data-title"),slug:t(e).attr("data-slug"),author:t(e).attr("data-author"),cs:t(e).attr("data-commentstatus"),status:t(e).attr("data-status"),template:t(e).attr("data-template"),month:t(e).attr("data-month"),day:t(e).attr("data-day"),year:t(e).attr("data-year"),hour:t(e).attr("data-hour"),minute:t(e).attr("data-minute"),navstatus:t(e).attr("data-navstatus")},n=t(e).closest(".row").parent("li");if(t(n).children("ol").length>0)var i=t(n).children("ol"),o=t(".quick-edit-form").clone().insertBefore(i);else var o=t(".quick-edit-form").clone().appendTo(n);t(o).siblings(".row").hide();s(o,a)}function s(e,a){t(e).find(".np_id").val(a.id),t(e).find(".np_title").val(a.title),t(e).find(".np_slug").val(a.slug),t(e).find(".np_author select").val(a.author),t(e).find(".np_template").val(a.template),t(e).find(".np_status").val(a.status),"open"===a.cs&&t(e).find(".np_cs").prop("checked","checked"),"hide"===a.navstatus?t(e).find(".np_nav_status").prop("checked","checked"):t(e).find(".np_nav_status").removeAttr("checked"),t(e).find('select[name="mm"]').val(a.month),t(e).find('input[name="jj"]').val(a.day),t(e).find('input[name="aa"]').val(a.year),t(e).find('input[name="hh"]').val(a.hour),t(e).find('input[name="mn"]').val(a.minute),t(e).show()}function r(){t(".np-quickedit-error").hide(),t(".sortable .quick-edit").remove(),t(".row").show()}function d(e){t(".np-quickedit-error").hide(),t.ajax({url:ajaxurl,type:"post",datatype:"json",data:t(e).serialize()+"&action=npquickedit&nonce="+nestedpages.np_nonce,success:function(a){"error"===a.status?(c(e),t(e).find(".np-quickedit-error").text(a.message).show()):(c(e),l(e,a.post_data),u(e))}})}function l(e,a){console.log(a);var n=t(e).parent(".quick-edit").siblings(".row");t(n).find(".title").text(a.post_title);var i=t(n).find(".status");t(i).text("publish"!==a._status&&"future"!==a._status?"("+a._status+")":"");var o=t(n).find(".nav-status");t(o).text("hide"==a.nav_status?"(Hidden)":"");var s=t(n).find(".np-quick-edit");t(s).attr("data-id",a.post_id),t(s).attr("data-template",a.page_template),t(s).attr("data-title",a.post_title),t(s).attr("data-slug",a.post_name),t(s).attr("data-commentstatus",a.comment_status),t(s).attr("data-status",a._status),t(s).attr("data-author",a.post_author),t(s).attr("data-navstatus",a.nav_status),t(s).attr("data-month",a.mm),t(s).attr("data-day",a.jj),t(s).attr("data-year",a.aa),t(s).attr("data-hour",a.hh),t(s).attr("data-minute",a.mn)}function c(e){t(e).find(".np-save-quickedit").removeAttr("disabled"),t(e).find(".np-qe-loading").hide()}function u(e){var a=t(e).parent(".quick-edit").siblings(".row");t(a).addClass("np-updated"),t(a).show(),t(e).parent(".quick-edit").remove(),setTimeout(function(){t(a).addClass("np-updated-show")},1500)}t(document).ready(function(){n()}),t(document).on("click",".child-toggle a",function(e){e.preventDefault();var a=t(this).parent(".child-toggle").parent(".row").siblings("ol");t(this).find("i").toggleClass("np-icon-arrow-down").toggleClass("np-icon-arrow-right"),t(a).toggle()}),t(document).on("click",".nestedpages-toggleall a",function(e){e.preventDefault(),"closed"==t(this).attr("data-toggle")?(t(".nestedpages ol li ol").show(),t(this).attr("data-toggle","opened"),t(this).text(nestedpages.collapse_text),t(".child-toggle i").removeClass("np-icon-arrow-right").addClass("np-icon-arrow-down"),r()):(t(".nestedpages ol li ol").hide(),t(this).attr("data-toggle","closed"),t(this).text(nestedpages.expand_text),t(".child-toggle i").removeClass("np-icon-arrow-down").addClass("np-icon-arrow-right"),r())}),t(document).on("click",".np-toggle-publish",function(e){e.preventDefault();var a=t(this).attr("href");t(".np-toggle-publish").removeClass("active"),t(this).addClass("active"),"#published"==a?(t(".nplist .page-row").hide(),t(".nplist .published").show()):t(".nplist .page-row").show()}),t(document).on("click",".np-toggle-edit",function(e){e.preventDefault();var a=t(this).siblings(".action-buttons");t(a).is(":visible")?(t(this).removeClass("active"),t(a).hide()):(t(this).addClass("active"),t(a).show())});var p=function(){var t=0;return function(e,a){clearTimeout(t),t=setTimeout(e,a)}}();t(window).resize(function(){p(function(){t(".action-buttons").removeAttr("style"),t(".np-toggle-edit").removeClass("active")},500)}),t(document).ready(function(){t(".sortable").nestedSortable({items:"li",toleranceElement:"> .row",handle:".handle",placeholder:"ui-sortable-placeholder",start:function(t,e){e.placeholder.height(e.item.height())},sort:function(t,a){e(a)},stop:function(){setTimeout(function(){n()},100),i()},update:function(){}})}),t(document).on("click",".np-quick-edit",function(e){e.preventDefault(),r(),o(t(this))}),t(document).on("click",".np-cancel-quickedit",function(e){var a=t(this).parents(".page-row");r(a),e.preventDefault()}),t(document).on("click",".np-save-quickedit",function(e){e.preventDefault(),t(".row").removeClass("np-updated").removeClass("np-updated-show");var a=t(this).parents("form");t(this).attr("disabled","disabled"),t(a).find(".np-qe-loading").show(),d(a)})});