import React from "react";

const Categories = ({categories}) => {
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
            {categories.map((category) => {
                console.log(category);
                console.log("category");
                console.log("category");
                return(
                    <div className="category-box">
                        {category.category}
                    </div>
                )
            })}
        </div>
    )
}

export default Categories;