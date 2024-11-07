import React, { useState, useEffect } from 'react';
import './Recommended.css';
import { API_KEY, value_convertor } from '../../data';
import { Link } from 'react-router-dom';

function Recommended({ categoryId = 1 }) {  // Default to a popular category like '1' if categoryId is missing
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        try {
            console.log(`Fetching data from URL: ${relatedVideoUrl}`);
            const response = await fetch(relatedVideoUrl);
            const data = await response.json();
            console.log('API Response:', data);

            if (data.items && data.items.length > 0) {
                setApiData(data.items);
            } else {
                setError('No data found');
                console.warn('No items found in API response');
            }
        } catch (err) {
            setError('Failed to fetch data');
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    if (error) {
        return <div className='error'>{error}</div>;
    }

    return (
        <div className='recommended'>
            {apiData.length > 0 ? (
                apiData.map((item, index) => (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
                        <img src={item.snippet.thumbnails.medium.url} alt='' />
                        <div className='vid-info'>
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_convertor(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Recommended;
