import { Text, clx } from "@medusajs/ui";
import { getCategoriesList, getCollectionsList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import ChatwootWidget from "@lib/components/AboutPage/Chatwoot";

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 600);
  const { product_categories } = await getCategoriesList(0, 600);

  return (
    <footer className="border-t border-ui-border-base bg-gray-100 w-full ">
      <div class="flex justify-between items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-800 pl-16 pr-16 md:pl-60 md:pr-60 font-serif">
        <div class="flex flex-col items-center flex-grow-1">
          <img src="https://stormsend1.djicdn.com/stormsend/uploads/55676c93bab3a517108fb7c9eb16ad1f.svg" alt="Shopping Cart Icon" class="w-12 h-12" />
          <span class="text-base md:text-lg text-zinc-800 dark:text-zinc-200 mt-2">Free Shipping over USD $149</span>
        </div>
        <div class="flex flex-col items-center flex-grow-1">
          <img src="https://stormsend1.djicdn.com/stormsend/uploads/48b0bc00-98af-0136-ac46-1237445f15bc/credit-card.svg" alt="Credit Card Icon" class="w-12 h-12" />
          <span class="text-base md:text-lg text-zinc-800 dark:text-zinc-200 mt-2">We accept credit cards, PayPal, and bank wires</span>
        </div>
        <div class="flex flex-col items-center flex-grow-1">
          <img src="https://stormsend1.djicdn.com/stormsend/uploads/4b8c3060-98af-0136-ac47-1237445f15bc/comment-alt-smile.svg" alt="Live Chat Icon" class="w-12 h-12" />
          <span class="text-base md:text-lg text-zinc-800 dark:text-zinc-200 mt-2">Order Service: Live Chat</span>
        </div>
        <ChatwootWidget />
      </div>




      <div className="content-container flex flex-col w-full py-12">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between">
          <div className="flex flex-col items-start  w-full">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-ui-fg-subtle hover:text-ui-fg-base uppercase mb-6 w-full"
            >
              Maple Global Store
            </LocalizedClientLink>
            <div className="mt-6">
              <h2 className="text-base font-semibold text-ui-fg-subtle mb-4">Payment Methods</h2>
              <div className="flex flex-wrap gap-4">
                <img src="https://www.mattsleeps.com/assets/payment_methods/1.svg" alt="Stripe" className="h-10" />
                <img src="https://www.mattsleeps.com/assets/payment_methods/21.svg" alt="PayPal" className="h-10" />
                <img src="https://www.mattsleeps.com/assets/payment_methods/7.svg" alt="Visa" className="h-10" />
                <img src="https://www.mattsleeps.com/assets/payment_methods/23.svg" alt="MasterCard" className="h-10" />


                {/* 添加更多的付款商logo */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-x-16 w-full">
            {product_categories && product_categories.length > 0 && (
              <div className="flex flex-col gap-y-2 w-full">
                <span className="text-base font-semibold text-ui-fg-base mb-4">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {product_categories.slice(0, 600).map((c) => {
                    if (c.parent_category) {
                      return null;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li className="flex flex-col gap-2 text-ui-fg-subtle text-base" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-ui-fg-base"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2 w-full">
                <span className="text-base font-semibold text-ui-fg-base mb-4">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle text-base">
                  {collections.slice(0, 600).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2 w-full">
              <span className="text-base font-semibold text-ui-fg-base mb-4">Follow us</span>
              <ul className="grid gap-2 text-ui-fg-subtle text-base">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/nextjs-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-12 justify-between items-center text-ui-fg-muted">
          <Text className="text-base">
            © {new Date().getFullYear()} Maple-Global LTD. All rights reserved.
          </Text>
          <div className="flex gap-4">
            <a
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ui-fg-base"
            >
              Privacy Policy
            </a>
            <a
              href="/TeamofUse"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ui-fg-base"
            >
              Terms of Use
            </a>
            <a
              href="/TeamofUse"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ui-fg-base"
            >
              Sales and Refunds
            </a>
            <a
              href="/TeamofUse"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ui-fg-base"
            >
              Business Information
            </a>
          </div>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
