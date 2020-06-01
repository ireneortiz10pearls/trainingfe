import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourse } from '../../../actions/course';
import { getCategories } from '../../../actions/category';
import { withRouter } from 'react-router-dom';

const CourseAdd = ({
  addCourse,
  getCategories,
  category: { categories, loading },
  history,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    link: '',
    description: '',
    tags: '',
    isActive: true,
  });

  const { title, categoryId, link, description, tags, isActive } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (tagsInput.length > 0) {
      addCourse(formData, tagsInput.toString(), history);
    } else {
      alert('You must add at least one tag for the course.');
      return;
    }
  };

  const [tagsInput, setTags] = useState([]);
  let tagInput = null;

  const removeTag = (i) => {
    const newTags = [...tagsInput];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Tab' && val) {
      if (tagsInput.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        alert('Tag allready exist!');
        return;
      }
      setTags([...tagsInput, val]);
      tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tagsInput.length - 1);
    }
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h3 className='card-title '>Course</h3>
                <p className='card-course'>
                  <i className='material-icons'>bookmarks</i> Add Course
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Course Title
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Course Title'
                          name='title'
                          value={title}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Category</label>
                        <select
                          className='form-control selectpicker'
                          onChange={(e) => onChange(e)}
                          name='categoryId'
                          value={categoryId}
                          data-style='btn btn-link'
                          required
                        >
                          <option>Select Course Category</option>
                          {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Link</label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Course Link'
                          name='link'
                          value={link}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Tags</label>
                        <div className='input-tag'>
                          <ul className='input-tag__tags'>
                            {tagsInput.map((tag, i) => (
                              <li key={tag}>
                                {tag}
                                <button
                                  type='button'
                                  onClick={() => {
                                    removeTag(i);
                                  }}
                                >
                                  +
                                </button>
                              </li>
                            ))}
                            <li className='input-tag__tags__input'>
                              <input
                                type='text'
                                name='tagInput'
                                onKeyDown={inputKeyDown}
                                ref={(c) => {
                                  tagInput = c;
                                }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>{' '}
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

CourseAdd.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ category: state.category });

export default connect(mapStateToProps, { addCourse, getCategories })(
  withRouter(CourseAdd)
);
