import React from "react"
import {
  getCollectionsList,
  listCategories,
  getCollectionByHandle,
  getCategoryByHandle,
} from "@lib/data"

const ProductNavigation = ({ productHandle }) => {
  const [collections, setCollections] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [breadcrumb, setBreadcrumb] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const { collections } = await getCollectionsList()
      const categories = await listCategories()
      setCollections(collections)
      setCategories(categories)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchBreadcrumb = async () => {
      // This is a simplified example. You'd need to determine whether to use collection or category based on your routing logic
      const collection = await getCollectionByHandle(productHandle)
      if (collection) {
        setBreadcrumb(["Home", collection.name, productHandle])
      }
    }
    if (productHandle) {
      fetchBreadcrumb()
    }
  }, [productHandle])

  return (
    <div>
      <nav>
        {/* Render your hierarchical navigation here using collections and categories */}
      </nav>
      <div>
        {/* Render your breadcrumb here */}
        {breadcrumb.map((item, index) => (
          <span key={index}>
            {index > 0 && " > "}
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProductNavigation
