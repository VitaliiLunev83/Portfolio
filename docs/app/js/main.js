$(document).ready(function() {
    $('.button[filter]').click(function() {
        if ($(this).attr('val') == 'off') {
            $('.button[filter]').attr('val', 'off').removeClass('focused');
            $(this).attr('val', 'on').addClass('focused');
            $('.filter > div').hide(500);
            $('.filter > div[filter=' + $(this).attr('filter') + ']').show(500);
            if ($(this).attr('filter') == 'all') {
                $('.button[filter]').attr('val', 'off').removeClass('focused');
                $(this).attr('val', 'on').addClass('focused');
                $('.filter > div').show(500);
            }
        }
    });






});