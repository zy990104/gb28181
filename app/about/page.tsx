'use client';

import {useState} from 'react';

function HomePage() {
    // 模拟的监控设备列表
    const devices = [
        '设备 1', '设备 2', '设备 3', '设备 4',
        '设备 5', '设备 6', '设备 7', '设备 8', '设备 9'
    ];

    // 当前选中的设备，初始化为null
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

    // 当前选择的宫格布局
    const [gridLayout, setGridLayout] = useState(1);

    // 动态计算网格布局的列数
    const getGridColumns = () => {
        switch (gridLayout) {
            case 1:
                return 'grid-cols-1';   // 1宫格
            case 4:
                return 'grid-cols-2';   // 4宫格：2列
            case 6:
                return 'grid-cols-3';   // 6宫格：3列
            case 9:
                return 'grid-cols-3';   // 9宫格：3列
            default:
                return 'grid-cols-1';
        }
    };

    // 动态计算每个格子的大小（确保铺满容器）
    const getGridTemplate = () => {
        switch (gridLayout) {
            case 1:
                return '1fr';   // 1宫格
            case 4:
                return 'repeat(2, 1fr)';  // 4宫格：2行2列
            case 6:
                return 'repeat(3, 1fr)';  // 6宫格：3列，每列占1fr
            case 9:
                return 'repeat(3, 1fr)';  // 9宫格：3行3列
            default:
                return 'auto';
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* 左侧监控设备列表 */}
            <div className="w-1/4 p-4 bg-gray-800 text-white">
                <h2 className="text-xl mb-4">监控设备</h2>
                <ul className="space-y-2">
                    {devices.map((device, index) => (
                        <li
                            key={index}
                            className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded"
                            onClick={() => setSelectedDevice(device)} // 选择设备时更新状态
                        >
                            {device}
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <h3 className="text-lg mb-2">选择布局</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setGridLayout(1)}
                            className={`px-4 py-2 border rounded ${gridLayout === 1 ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}
                        >
                            1宫格
                        </button>
                        <button
                            onClick={() => setGridLayout(4)}
                            className={`px-4 py-2 border rounded ${gridLayout === 4 ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}
                        >
                            4宫格
                        </button>
                        <button
                            onClick={() => setGridLayout(6)}
                            className={`px-4 py-2 border rounded ${gridLayout === 6 ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}
                        >
                            6宫格
                        </button>
                        <button
                            onClick={() => setGridLayout(9)}
                            className={`px-4 py-2 border rounded ${gridLayout === 9 ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"}`}
                        >
                            9宫格
                        </button>
                    </div>
                </div>
            </div>

            {/* 右侧视频显示区 */}
            <div className="flex-1 p-4 bg-gray-100">
                <div
                    className={`grid gap-4 ${getGridColumns()}`}
                    style={{
                        gridTemplateRows: gridLayout === 6 ? 'repeat(2, 1fr)' : getGridTemplate(),  // 6宫格时设置为2行3列
                        gridTemplateColumns: getGridTemplate(),
                        height: '100%',  // 确保 grid 容器充满容器高度
                    }}
                >
                    {Array.from({length: gridLayout}).map((_, index) => (
                        <div key={index} className="relative w-full h-full bg-gray-900">
                            <div
                                className="w-full h-full bg-black flex items-center justify-center text-white text-xl rounded"
                                style={{backgroundColor: selectedDevice ? 'transparent' : 'gray'}}
                            >
                                {selectedDevice ? (
                                    <video
                                        className="w-full h-full object-cover"
                                        src={`https://www.w3schools.com/html/mov_bbb.mp4`} // 用示例视频替代
                                        controls
                                        autoPlay
                                        muted
                                    />
                                ) : (
                                    <span>选择监控设备</span>
                                )}
                            </div>
                            {selectedDevice && (
                                <div
                                    className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 p-1 rounded">
                                    {selectedDevice}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage