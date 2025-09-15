import {  useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Model";
import AdminMenu from "./AdminMenu";
// import type { MyAPIError } from "../../types/main";

interface Category {
_id: string;
name: string;
 __v?:string | number;
}


const CategoryList = () => {
;

const  {data ,refetch } =  useFetchCategoriesQuery({})
  const categories = data as Category[]

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
     
      
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
     refetch()

    } catch (error) {
      console.error(error);
      toast.error("Creating category failed.");
    }
  };

  const handleUpdateCategory = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatingName || updatingName == selectedCategory?.name) {
      toast.error("Category name is required");
      return;
    }
  
    try {
      
      const result = await updateCategory({
        categoryId: selectedCategory?._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.updatedCategory.name} is updated`);
        console.log(result);
        
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
      refetch()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
           
      const name = selectedCategory?.name
      const result = await deleteCategory(selectedCategory?._id).unwrap();
      
      

      if (!result) {
        toast.error(result.error || "Something went wrong");
      } else {
       
        
        toast.success(`${name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
      refetch()
    } catch (error) {
      console.error(error);
      toast.error(" failed.");
    }
  };
  
  return (
    <div className="ml-[10%] flex flex-col md:flex-row ">
      <AdminMenu />

      <div className="md:w-3/4 p-3 border-1 rounded-2xl">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          
        />
        <br />
        <hr />

        <div className="flex flex-wrap">

          {categories.length ? 
          categories?.map((category:Category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          )): (
            <h3 className=" mx-auto mt-4">Nothing to show</h3>
          )}

        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;