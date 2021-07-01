import { ISimpleListCell } from "azure-devops-ui/List";
import { MenuItemType } from "azure-devops-ui/Menu";
import { ColumnMore, ISimpleTableCell } from "azure-devops-ui/Table";
import { renderExpandableTreeCell, renderTreeCell } from "azure-devops-ui/TreeEx";
import {
    ITreeItem,
    ITreeItemProvider,
    TreeItemProvider,
} from "azure-devops-ui/Utilities/TreeItemProvider";

export interface ILocationTableItem extends ISimpleTableCell {
    name: string;
    continent: ISimpleListCell;
    server: string;
    city: string;
    state: string;
    country: string;
}

export const tableItems: ILocationTableItem[] = [
    {
        city: "San Francisco",
        continent: { text: "North America" },
        country: "United States",
        name: "Mission District",
        server: "West US",
        state: "California",
    },
    {
        city: "Paris",
        continent: { text: "Europe" },
        country: "France",
        name: "Batignolles-Monceau",
        server: "West Europe",
        state: "Ile-de-France",
    },
    {
        city: "Seoul",
        continent: { iconProps: { iconName: "Home" }, text: "Asia" },
        country: "South Korea",
        name: "Gangnam",
        server: "East Asia",
        state: "Gyeonggi",
    },
    {
        city: "Montevideo",
        continent: { iconProps: { iconName: "Home" }, text: "South America" },
        country: "Uruguay",
        name: "Atahualapa",
        server: "Brazil South",
        state: "Departmento de Montevideo",
    },
];

export const continentColumn = {
    id: "continent",
    minWidth: 200,
    name: "Continent",
    renderCell: renderTreeCell,
    width: -100,
};
export const nameColumn = {
    id: "name",
    name: "Name",
    renderCell: renderExpandableTreeCell,
    width: 400,
};
export const moreColumn = new ColumnMore(() => {
    return {
        id: "sub-menu",
        items: [
            { id: "submenu-one", text: "SubMenuItem 1" },
            { id: "submenu-two", text: "SubMenuItem 2" },
            { id: "divider", itemType: MenuItemType.Divider },
            { id: "submenu-three", checked: true, readonly: true, text: "SubMenuItem 3" },
            { id: "submenu-four", disabled: true, text: "SubMenuItem 4" },
        ],
    };
});

export const treeColumns = [nameColumn, continentColumn, moreColumn];

export function getItemProvider(rootItemsCount: number): ITreeItemProvider<ILocationTableItem> {
    const rootItems: Array<ITreeItem<ILocationTableItem>> = [];

    // Build the set of items based on the current root item count.
    for (let rootIndex = 0; rootIndex < rootItemsCount; rootIndex++) {
        rootItems.push({
            childItems: [
                { data: tableItems[1] },
                { childItems: [{ data: tableItems[3] }], data: tableItems[2], expanded: false },
            ],
            data: tableItems[0],
            expanded: true,
        });
    }

    return new TreeItemProvider<ILocationTableItem>(rootItems);
}
