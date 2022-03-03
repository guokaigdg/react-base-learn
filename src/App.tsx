/*
 * @Author: guokai05
 * @Date: 2022-02-28 17:39:05
 * @LastEditors: guokai05
 * @LastEditTime: 2022-03-03 01:18:51
 */
import * as React from 'react';
import Content from './components/content';
import './components/style/app.less';

const App: React.FunctionComponent<any> = () => {
    return (
        <div className='root'>
            <Content />
        </div>
    );
};
export default App;


// // 修改
// const editItem = (editItem: ListItemProps): void => {
//     const index = list.findIndex((item: ListItemProps) => item.id === editItem.id);
//     if (index > -1) {
//         const newLists: ListItemProps[] = list;
//         newLists[index] = {
//             title: '修改时间:' + Date.now(),
//             content: 'string',
//             id: Date.now(),
//             done:false
//         };
//         alert('确认修改');
//         setList([...newLists]);
//     }
// };