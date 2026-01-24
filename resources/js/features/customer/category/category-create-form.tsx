import { useForm } from "@inertiajs/react"
import { index, store } from "@/routes/customer/category"

import { Card, CardContent, CardDescription,
  CardHeader, CardTitle, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LoaderCircle } from "lucide-react"

export default function CategoryCreateForm() {
    const form = useForm(
        {
            name: '',
            type: '',
            status: '',
        }
    ) 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        form.submit(store())
    }

    return (
        <Card className="w-full mt-5 shadow-none">
            <CardHeader>
                <CardTitle>Create Category</CardTitle>
                <CardDescription>
                    Add a new expense category to organize and track your spending more efficiently.
                </CardDescription>

                <Separator />

                <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Category Name</Label>
                                <Input type="text" id="name" name="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Category name" />
                                {form.errors.name && <small className="text-red-500">{form.errors.name}</small>}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="type">Expense type</Label>
                            <Select value={form.data.type} onValueChange={(e) => form.setData('type', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select expense type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Expense type</SelectLabel>
                                        <SelectItem value="income">Income</SelectItem>
                                        <SelectItem value="expense">Expense</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.type && <small className="text-red-500">{form.errors.type}</small>}
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="status">Set status</Label>
                                <Select value={form.data.status} onValueChange={(e) => form.setData('status', e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Expense type</SelectLabel>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {form.errors.status && <small className="text-red-500">{form.errors.status}</small>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" className="cursor-pointer" asChild>
                                <a href={index.url()}>
                                    Cancel
                                </a>
                            </Button>
                            <Button type="submit" className="cursor-pointer" disabled={form.processing}>
                                {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create Category
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    )
}
