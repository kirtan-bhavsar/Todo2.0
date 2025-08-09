import React, { useState } from "react";
// import {FaSolidX} from 'react-icons/fa';
import { HiXMark } from "react-icons/hi2";
import DropArea from "./DropArea";

const Categories = ({
  categories,
  changeCategory,
  category,
  addCategory,
  showAddCategory,
  setShowAddCategory,
  deleteCategory,
  draggedTodo,
  changeTodoCategory
}) => {
  const [visibleDrop, setVisibleDrop] = useState(null);

  return (
    <div className="Categories-Container">
      {categories.map((individualCategory) => {
        return (
          <React.Fragment key={individualCategory._id}>
            <div
              onDragEnter={() => {
                setVisibleDrop(individualCategory._id);
                // console.log(
                //   `The todo with id : ${draggedTodo} is being tranferred to the category with id : ${individualCategory._id}`
                // );
              }}
              onDragLeave={() => {
                setVisibleDrop(null);
                changeTodoCategory(draggedTodo,individualCategory._id);
            }
            }
              className={
                category === individualCategory.category
                  ? "category-box active-category"
                  : "category-box"
              }
              onClick={() => changeCategory(individualCategory.category)}
            >
              {individualCategory.category}
              <span onClick={() => deleteCategory(individualCategory._id)}>
                <HiXMark></HiXMark>
              </span>
            </div>
            <DropArea show={visibleDrop === individualCategory._id}></DropArea>
          </React.Fragment>
        );
      })}
      {!showAddCategory && (
        <div
          className="add-category-button"
          onClick={() => setShowAddCategory(true)}
        >
          +
        </div>
      )}
      {showAddCategory && (
        <div className="add-category">
          <form onSubmit={(e) => addCategory(e)}>
            <input type="text" name="category" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
