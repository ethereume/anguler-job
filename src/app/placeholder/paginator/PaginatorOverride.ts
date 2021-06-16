import { MatPaginatorIntl } from "@angular/material/paginator";


 export default () => {
    let customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Wybierz rozmiar strony';
    customPaginatorIntl.lastPageLabel = "Ostatnia strona";
    customPaginatorIntl.firstPageLabel = "Pierwsza strona";
    customPaginatorIntl.nextPageLabel = "Następna strona";
    customPaginatorIntl.previousPageLabel = "Poprzednia strona";
    return customPaginatorIntl;
}