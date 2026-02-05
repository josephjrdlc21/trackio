<?php

namespace App\Interfaces\Customer;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response as ResponsePDF;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface ReportRepositoryInterface {

    public function index(array $data): Response;
    public function export_excel(array $data): BinaryFileResponse;
    public function export_pdf(array $data): ResponsePDF;
}