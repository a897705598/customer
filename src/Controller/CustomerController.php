<?php

namespace App\Http\Controllers\Ares;

use App\Traits\ApiValidator;
use App\Model\Ares\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use StructuredResponse\StructuredResponse;

class CustomerController extends Controller
{
    use StructuredResponse, ApiValidator;

    public function customerList()
    {
        $customers = Customer::all();
        return view('ares.basic.customer.customerList')->with('customers', $customers);
    }

    public function addCustomer(Request $request)
    {
        $this->validateApi($request, [
            'customer_name'=>'required',
            'customer_address'=>'required',
            'contact_phone'=>'required'
        ]);
        $inputs = $request->all();
        Log::info($inputs);
        $res = (new Customer())->add($inputs);
        if ($res) {
            return $this->genResponse(1, '添加成功');
        }
        return $this->genResponse(0, '添加失败');
    }

    public function updateCustomer(Request $request)
    {
        $this->validateApi($request, ['customer_id'=>'required|exists:customers']);
        $inputs = $request->all();
        $res = (new Customer())->edit($inputs);
        if ($res) {
            return $this->genResponse(1, '修改成功');
        }
        return $this->genResponse(0, '修改失败');
    }

    public function deleteCustomer(Request $request)
    {
        $this->validateApi($request, ['customer_id'=>'required|exists:customers']);
        $inputs = $request->all();
        $customer = Customer::find($inputs['customer_id']);
        if ($customer) {
            $customer->delete();
            return $this->genResponse(1, '删除成功');
        }
        return $this->genResponse(0, '删除失败');
    }
}
