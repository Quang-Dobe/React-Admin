import { TextInput } from "react-admin";

const searchFilter = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Name" source="name" />,
    // <TextInput label="Description" source="description" />,
];

export default searchFilter