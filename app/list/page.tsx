'use client'
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';  // 引入 uuid 库

interface Data {
    value: string;
    type: number,
    id: string
}
function List() {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Data[]>([]);
    const handleClick = () => {
        if (!value.trim()) {
            return;
        }
        const data = [...list, {id: uuidv4(), value: value, type: 1}];

        // 去重：根据 value 字段去重
        const uniqueData = data.filter(
            (v, index, self) =>
                index === self.findIndex((t) => t.value === v.value)
        );

        setList(uniqueData);
        setValue('')
    };
    const handleDelete = (id: string) => {
        const data =
            list.filter((v) => v.id !== id)
        setList(data);
    }
    const handleComplete = (id: string) => {
        const updatedList = list.map((e: Data) => {
            if (e.id === id) {
                return {...e, type: 2}; // 创建新的对象，更新 type
            }
            return e; // 返回原始项
        });
        setList(updatedList);
    }


    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-50">
            <div className="border-2 border-gray-300 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-white shadow-lg">
                <div className="flex items-center justify-between space-x-4 mb-2">
                    <input
                        type="text"
                        className="w-full md:w-8/12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入搜索内容"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleClick}>
                        添加
                    </button>
                </div>
                <div className="space-y-4">
                    {list.map((v, index) => (
                        <div
                            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition-all"
                            key={index}>
                            <div className="flex-1 text-lg font-medium">{v.value}</div>
                            <div
                                className={`text-sm ${v.type === 1 ? 'text-yellow-500' : 'text-green-500'} flex justify-center items-center w-24`}>
                                {v.type === 1 ? '代办' : '完成'}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                    onClick={() => handleDelete(v.id)}
                                >
                                    删除
                                </button>
                                <button
                                    onClick={() => handleComplete(v.id)}
                                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                >
                                    完成
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default List