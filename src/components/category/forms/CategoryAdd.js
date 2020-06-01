import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory } from '../../../actions/category';
import { getList } from '../../../actions/list';
import { withRouter } from 'react-router-dom';

const CategoryAdd = ({
  addCategory,
  getList,
  list: { list, loading },
  history,
}) => {
  useEffect(() => {
    getList('CategoryType');
  }, [getList]);

  const [formData, setFormData] = useState({
    name: '',
    typeId: '',
    isActive: true,
  });

  const { name, typeId, isActive } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(formData, history);
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h3 className='card-title '>Category</h3>
                <p className='card-category'>
                  <i className='material-icons'>bookmarks</i> Add Category
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
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
                        <label className='bmd-label-floating'>
                          Category Type
                        </label>
                        <select
                          className='form-control selectpicker'
                          onChange={(e) => onChange(e)}
                          name='typeId'
                          value={typeId}
                          data-style='btn btn-link'
                        >
                          <option>Select Category Type</option>
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
                    value='Add'
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

CategoryAdd.propTypes = {
  addCategory: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list });

export default connect(mapStateToProps, { addCategory, getList })(
  withRouter(CategoryAdd)
);
