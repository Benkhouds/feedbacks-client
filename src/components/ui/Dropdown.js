import { Fragment } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react';

function Dropdown({ options, onChange, value }) {
   return (
      <Listbox value={value} onChange={onChange}>
         <div className="relative">
            <Listbox.Button
               className="cursor-pointer  w-full py-3  text-left pl-4 bg-light rounded   
               focus:outline-none focus:ring-blue-700 focus:ring-1 shadow"
            >
               <span className="block truncate capitalize">{value}</span>
               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                     className="w-5 h-5 text-gray-400"
                     aria-hidden="true"
                  />
               </span>
            </Listbox.Button>

            <Transition
               as={Fragment}
               leave="transition ease-in duration-100"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <Listbox.Options className="absolute w-full py-1 mt-4 divide-y divide-gray-200 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, index) => (
                     <Listbox.Option
                        key={index}
                        className={({ active }) =>
                           `${active ? 'text-purple-500 ' : 'text-gray-600'}
                        cursor-pointer select-none relative py-3  px-6`
                        }
                        value={option}
                     >
                        {({ selected, _ }) => (
                           <>
                              <span
                                 className={`${
                                    selected ? 'font-medium' : 'font-normal'
                                 } block truncate`}
                              >
                                 {option}
                              </span>
                              {selected ? (
                                 <span
                                    className={`absolute inset-y-0 right-0 flex items-center pr-3`}
                                 >
                                    <CheckIcon
                                       className="w-5 h-5"
                                       aria-hidden="true"
                                    />
                                 </span>
                              ) : null}
                           </>
                        )}
                     </Listbox.Option>
                  ))}
               </Listbox.Options>
            </Transition>
         </div>
      </Listbox>
   );
}

export default Dropdown;
