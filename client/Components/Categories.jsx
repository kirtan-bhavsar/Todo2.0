import React from "react";

const Categories = ({categories,changeCategory,category,addCategory,showAddCategory,setShowAddCategory}) => {
    return(
        <div className="Categories-Container">
            {categories.map((individualCategory) => {
                return(
                    <div className={ category === individualCategory.category ? "category-box active-category" : "category-box" } onClick={() => changeCategory(individualCategory.category)}>
                        {individualCategory.category}
                    </div>
                )
            })}
            { !showAddCategory &&
            <div className="add-category-button" onClick={() => setShowAddCategory(true)}>
                +
            </div>
}
            { showAddCategory &&
            <div className="add-category">
                <form onSubmit={(e) => addCategory(e)}>
                <input type="text" name="category"/>
                </form>
            </div>
}
        </div>
    )
}

export default Categories;