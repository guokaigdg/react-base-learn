import React, {FC, useEffect, useState} from 'react';
import {rawList} from './data/index';
import './style/content.less';

interface ListItemProps {
    title: string;
    content: string;
    done: boolean;
    id: number;
}

interface ContentProps {
    title?: string
}

const Content: FC<ContentProps> = (props) => {
    const {title = '待办清单'} = props;
    const [addItemName, setaddItemName] = useState<string>('');
    const [list, setList] = useState<ListItemProps[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    // 增加
    const addItem = (): void => {
        if (addItemName.length === 0) {
            return;
        }
        setList([...list,{
                title: addItemName,
                content: addItemName,
                done: false,
                id: Date.now(),
        }]);
        setaddItemName('');
    };
    // 删除
    const deleteItem = (removeItem: ListItemProps): void => {
        const index = list.findIndex((item: ListItemProps) => item.id === removeItem.id);
        if (index > -1) {
            const newLists: ListItemProps[] = list;
            newLists.splice(index, 1);
            setList([...newLists]);
        }
    };
    // 完成项
    const finishItem = (finishItem: ListItemProps): void => {
        const index = list.findIndex((item: ListItemProps) => item.id === finishItem.id);
        if (index > -1) {
            const newLists: ListItemProps[] = list;
            newLists[index] = {
                ... newLists[index],
                done: true
            };
            setList([...newLists]);
        }
    };
    // 处理键盘事件
    const handleOnKeyDown = (event: any): void => {
        const {key} = event;
        // 点击回车事件
        if(key === 'Enter'){
            addItem();
        }
    };

    useEffect(() => {
        console.log(list);
    }, [list]);

    useEffect(() => {
        console.log(list);
        // 副作用, 请求后端数据
        setTimeout(() => {
            setList(rawList);
            setLoading(false);
        }, 200);
    }, []);

    return (
        <div className='root'>
            <div className='header'>
                <input
                    className='input-item'
                    placeholder='输入待办事项'
                    value={addItemName}
                    onChange={(e) => setaddItemName(e.target.value)}
                    required
                    onKeyDown={event => handleOnKeyDown(event)}
                />
                <div className='add-button' onClick={() => addItem()}>
                ➕
                </div>
            </div>
            <div className='list-wrap'>
                {isLoading ? (
                    <div>⏳加载中...</div>
                ) : (
                    <div>
                        <span className='title'>全部:</span>
                        {list.map((item: ListItemProps, index: number) => (
                            <>
                             {!item.done && 
                                // <div key={item.id} className='list-item'>
                                <>
                                    <div key={index} className='list-item'>
                                        <div>
                                            <input type='checkbox' defaultChecked={item.done} onChange={() => finishItem(item)} />
                                            <span> {item.title}</span>
                                        </div>
                                        <button onClick={() => deleteItem(item)}>🗑️</button>
                                    </div>
                                    <div className='index-test'>{item.title}</div>
                                </>
                             }
                             </>
                        ))}
                        <span className='title'>完成:</span>
                        {list.map((item: ListItemProps, index: number) => (
                            <>
                              {item.done && 
                                <div key={index} className='list-item'> 
                                    <span> {item.title}</span>
                                    <button onClick={() => deleteItem(item)}>🗑️</button>
                                </div>
                              }
                            </>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;
