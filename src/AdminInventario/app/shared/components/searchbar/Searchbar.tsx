import * as React from 'react';
import {AiOutlineSearch} from 'react-icons/ai'

interface ISearchbarProps {
}

const Searchbar: React.FunctionComponent<ISearchbarProps> = (props) => {
  return (
    <form action="" className='min-w-[30%] relative'>
        <div className='relative'>
            <input type="search" placeholder='Type Here' className='w-full p-4 rounded-full bg-white'/>
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-secundary rounded-full'>
                <AiOutlineSearch className='text-white'/>
            </button>
        </div>
    </form>
  );
};

export default Searchbar;
