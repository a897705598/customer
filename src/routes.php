<?php
Route::group(['prefix'=>'dept', 'namespace'=>'Jxc\Controller'], function () {
    Route::get('list', ['uses'=>'DeptController@deptList']);
    Route::post('add', ['uses'=>'DeptController@addDept']);
    Route::post('edit', ['uses'=>'DeptController@updateDept']);
    Route::post('delete', ['uses'=>'DeptController@deleteDept']);
});
