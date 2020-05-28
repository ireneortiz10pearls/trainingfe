import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editCategory, getCategoryById } from '../../../actions/category';
import { getList } from '../../../actions/list';
import { withRouter } from 'react-router-dom';

const CategoryEdit = ({
  getCategoryById,
  editCategory,
  getList,
  category: { category, loading },
  list: { list },
  match,
  history,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    typeId: '',
    isActive: '',
  });

  useEffect(() => {
    getList('CategoryType');
  }, [getList]);

  useEffect(() => {
    const fetchCategory = async () => await getCategoryById(match.params.id);
    fetchCategory();
  }, [loading, getCategoryById]);

  useEffect(() => {
    if (!loading && category) {
      setFormData({
        id: category.id,
        name: loading || !category.name ? '' : category.name,
        typeId: loading || !category.typeId ? '' : category.typeId,
        isActive: loading || !category.isActive ? '' : category.isActive,
      });
    }
  }, [loading, category]);

  const { id, name, typeId, isActive } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editCategory(formData, history);
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h2 className='card-title '>Category</h2>
                <p className='card-category'>
                  <i className='material-icons'>bookmarks</i> Edit Category
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Category Id
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Category Id'
                          name='id'
                          value={id}
                          disabled
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Category Name
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Category Name'
                          name='name'
                          value={name}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label>Category Type</label>
                        <select
                          className='form-control selectpicker'
                          onChange={(e) => onChange(e)}
                          name='typeId'
                          value={typeId}
                          data-style='btn btn-link'
                        >
                          {list.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.setname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    className='btn btn-warning'
                    value='Update'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CategoryEdit.propTypes = {
  getCategoryById: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  list: state.list,
});

export default connect(mapStateToProps, {
  editCategory,
  getCategoryById,
  getList,
})(withRouter(CategoryEdit));
