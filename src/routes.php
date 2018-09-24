<?php
Route::group(['prefix'=>'customer', 'namespace'=>'Jxc\Controller'], function () {
    Route::get('list', ['uses'=>'CustomerController@customerList']);
    Route::post('add', ['uses'=>'CustomerController@addCustomer']);
    Route::post('edit', ['uses'=>'CustomerController@updateCustomer']);
    Route::post('delete', ['uses'=>'CustomerController@deleteCustomer']);
});
