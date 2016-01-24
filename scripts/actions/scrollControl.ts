module Inknote {

    if (typeof window != "undefined") {
        window.onmousewheel = function (ev: MouseWheelEvent) {

            if (Modal.isModalOpen === true) {
                return;
            }

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
}
