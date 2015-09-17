module Inknote {

    export class HttpService {

        private static _instance: HttpService;

        static get Instance() {
            if (!HttpService._instance) {
                HttpService._instance = new HttpService();
            }
            return HttpService._instance;
        }

        $get(url: string, callback: (ev: Event) => any, onerror: (ev: ErrorEvent) => any) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);

            request.onload = callback;
            request.onerror = onerror;

            request.send();
        }

        post(url: string, data: string, callback: (ev: Event) => any, onerror: (ev: ErrorEvent) => any) {
            var request = new XMLHttpRequest();
            request.open("POST", url, true);

            request.onload = callback;
            request.onerror = onerror;

            request.send(data);
        }

    }

} 