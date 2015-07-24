module Inknote {

    window.onmousewheel = function (ev: MouseWheelEvent) {

        var isUp = false;
        if (ev.wheelDelta > 0) {
            isUp = true;
        }

        if (isUp) {
            ScrollService.Instance.up();
        }
        else {
            ScrollService.Instance.down();
        }
    }

}
