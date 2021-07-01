import * as React from "react";
import { getItemProvider, ILocationTableItem, treeColumns } from "./TreeData";
import { Tree } from "azure-devops-ui/TreeEx";
import { ITreeItemProvider, ITreeItemEx } from "azure-devops-ui/Utilities/TreeItemProvider";

export default class TreeManyItemsExample extends React.Component<{}> {
    private itemProvider: ITreeItemProvider<ILocationTableItem>;

    constructor(props: {}) {
        super(props);

        this.itemProvider = getItemProvider(2000);
    }

    public render(): JSX.Element {
        return (
            <div className="flex-row bolt-table-card" style={{ height: "400px" }}>
                <Tree<ILocationTableItem>
                    ariaLabel="Tree with many items"
                    columns={treeColumns}
                    itemProvider={this.itemProvider}
                    onToggle={(event, treeItem: ITreeItemEx<ILocationTableItem>) => {
                        this.itemProvider.toggle(treeItem.underlyingItem);
                    }}
                    scrollable={true}
                />
            </div>
        );
    }
}
