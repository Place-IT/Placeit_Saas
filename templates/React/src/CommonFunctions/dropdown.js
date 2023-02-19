export default function Dropdown(props)
{
    return <div className="flex justify-end mx-4 -mb-4">
        <button id="dropdownBottomButton" data-dropdown-toggle="dropdownBottom" data-dropdown-placement="bottom"
                className="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">Year <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
        </svg></button>

        <!-- Dropdown menu -->
        <div id="dropdownBottom" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 hidden"
             data-popper-placement="bottom"
             style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(1409.6px, 326.4px, 0px);">
            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownBottomButton">
                <li>
                    <a href="#"
                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2023</a>
                </li>

            </ul>
        </div>

    </div>
}