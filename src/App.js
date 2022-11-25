import { Admin, Resource, NotFound } from 'react-admin';
import { MyLayout } from './MyLayout';
import { CategoryList, CategoryCreate, NewCategoryCreate } from './Global/Category';
import { AuthProvider, MyLoginPage } from './Global/Login'
import CustomRestProvider from './DataProvider/CustomDataProvider'
// import simpleRestProvider from 'ra-data-simple-rest';


// Provide dataProvider
const categoryProvider = CustomRestProvider('https://localhost:7173');

// Provide authProvider
const authProvider = AuthProvider('https://localhost:7173')

function UserList() {
  return (
    <Admin 
        title="Nashtech" 
        // authProvider={authProvider}
        // loginPage={MyLoginPage}
        dataProvider={categoryProvider} 
        layout={MyLayout}
        catchAll={NotFound}
        // requireAuth={true}
    >
      <Resource 
        title="Category"
        name="api/Category" 
        list={CategoryList}
        create={CategoryCreate}
        // create={NewCategoryCreate}
        // options={{ label: 'Category' }} 
        recordRepresentation={(record) => `${record.name}`}
      />
  </Admin>
  );
}

export default UserList;