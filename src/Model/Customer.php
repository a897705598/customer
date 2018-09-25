<?php

namespace App\Model\Ares;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $table = 'customers';

    protected $dates = ['deleted_at'];

    protected $primaryKey = 'customer_id';

    protected $fillable = [
        'customer_name', 'customer_address', 'contact_phone'
    ];

    public function add($params)
    {
        $model = self::fill($params);
        return $model->save();
    }

    public function edit($params)
    {
        $model = self::find($params['customer_id']);
        return $model->fill($params)->save();
    }
}
