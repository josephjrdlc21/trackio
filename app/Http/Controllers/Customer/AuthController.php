<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\AuthRepositoryInterface;
use App\Http\Requests\PageRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AuthController extends Controller{

    protected AuthRepositoryInterface $auth_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(AuthRepositoryInterface $auth_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->auth_repo = $auth_repo;
    }

    public function login(PageRequest $request): Response {

        return $this->auth_repo->login();
    }

    public function authenticate(PageRequest $request): RedirectResponse {
        $data = $request->all();

        return $this->auth_repo->authenticate($data);
    }

    public function logout(PageRequest $request): RedirectResponse {

        return $this->auth_repo->logout();
    }
}