module Inknote {

    export class GoToService {

        private static _instance: GoToService;

        static get Instance(): GoToService {
            if (!GoToService._instance) {
                GoToService._instance = new GoToService();
            }
            return GoToService._instance;
        }

        goToDrawingItem(item: IDrawable) {
            ScrollService.Instance.y = item.y - 80;
            ScoringService.Instance.selectID = item.ID;
            ScoringService.Instance.refresh();
        }

        goToID(id: string) {
            var scoreItems = ScoringService.Instance.getPrintItems();

            var item = getFirstItemWhere(scoreItems, function (item: IDrawable) {
                return id == item.ID;
            });

            if (item == null) {
                log("no scoreable item with this id, so cannot go to it", MessageType.Error);
                return;
            }

            this.goToDrawingItem(item);

        }

        goToModelItem(item: IIdentifiable) {
            this.goToID(item.ID);
        }
    }

}