import { mergeMap, catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StateObservable, ActionsObservable, Epic } from "redux-observable";
import { IStore } from "../../reducers";
import { withJsonContentType } from "../../epicUtils";
import { EpicDependencies } from "../../store";
import { END_POINTS } from "../../endpoints";
import { LaunchCodeApiResponse } from "../../../reactComponents/shared/publicInterfaces";
import { IEDIT_QUOTE_REQUEST } from "./editQuoteConstants";
import { IEditQuoteLoadAction, IEditQuoteLoadFailedAction, IEditQuoteSuccessAction, editQuoteLoadFailedAction, editQuoteLoadSuccessAction } from "./editQuoteActions";

export const editQuoteEpic: Epic = (
    action$: ActionsObservable<IEditQuoteLoadAction>,
    store: StateObservable<IStore>,
    {post}: EpicDependencies
): Observable<IEditQuoteSuccessAction | IEditQuoteLoadFailedAction> =>
    action$.ofType(IEDIT_QUOTE_REQUEST.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<LaunchCodeApiResponse<string>>(
                    END_POINTS.Quotes.EDIT_QUOTE,
                    action.data,
                    withJsonContentType(store.value)
                )
                    .pipe(
                        map((response: LaunchCodeApiResponse<string>): IEditQuoteSuccessAction => {
                            return editQuoteLoadSuccessAction(action.data);
                        }),
                        catchError(() => ActionsObservable.of(editQuoteLoadFailedAction("Unable to load editQuotes")))
                    )
            )
        );