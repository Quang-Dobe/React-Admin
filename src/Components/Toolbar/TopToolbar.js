import { 
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

export default ListActions