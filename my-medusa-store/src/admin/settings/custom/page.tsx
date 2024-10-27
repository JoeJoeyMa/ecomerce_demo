import type { SettingConfig } from "@medusajs/admin"
import { useAdminProducts } from "medusa-react"

const CustomSettingPage = () => {
    const { products } = useAdminProducts()

    return (
        <div>
            <h1>Custom Setting Page</h1>
            <div className="bg-white">
                {products?.map((product) => product.title)}
            </div>
        </div>
    )
}

export const config: SettingConfig = {
    card: {
        label: "Custom",
        description: "Manage your custom settings",
    },
}

export default CustomSettingPage