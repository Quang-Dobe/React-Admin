import { downloadCSV } from 'react-admin';
import jsonExport from 'jsonexport/dist';


// Get all data (By calling API)
const proExporter = (records, fetchRelatedRecords) => {
    // will call dataProvider.getMany('posts', { ids: records.map(record => record.post_id) }), ignoring duplicate and empty post_id
    fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
        const data = records.map(record => ({
                ...record,
                post_title: posts[record.post_id].title,
        }));
        return jsonExport(data, {
            headers: ['id', 'post_id', 'post_title', 'body'],
        }, (err, csv) => {
            downloadCSV(csv, 'comments');
        });
    });
};

export default proExporter