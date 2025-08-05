import React from "react";

const Categories = ({categories,changeCategory,category}) => {
    return(
        <div className="Categories-Container">
            {/* <div className="category">
                Cat1
            </div>
            <div className="category">
                Cat2
            </div>
            <div className="category">
                Cat3
            </div>
            <div className="category">
                Cat3
            </div>
            <div className="category">
                Sales follow up
            </div> */}
            {categories.map((individualCategory) => {
                // console.log(category);
                // console.log("category");
                // console.log("category");
                return(
                    <div className={ category === individualCategory.category ? "category-box active-category" : "category-box" } onClick={() => changeCategory(individualCategory.category)}>
                        {individualCategory.category}
                    </div>
                )
            })}
        </div>
    )
}

export default Categories;