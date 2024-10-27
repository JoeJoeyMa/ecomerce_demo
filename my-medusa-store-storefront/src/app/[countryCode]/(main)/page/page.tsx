import CategoryNav from "@modules/layout/components/category-nav"

const StorePage = () => {
  return (
    <div className="flex flex-col small:flex-row small:items-start py-6">
      <CategoryNav />
      {/* 页面的其余内容 */}
    </div>
  )
}

export default StorePage
