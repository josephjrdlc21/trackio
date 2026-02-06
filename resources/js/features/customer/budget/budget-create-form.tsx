import { useForm } from "@inertiajs/react"
import { index, store } from "@/routes/customer/budget"
import { BudgetCreateProps } from "@/types/customer/budget"

import { Card, CardContent, CardDescription,
  CardHeader, CardTitle, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LoaderCircle } from "lucide-react"

export default function BudgetCreateForm({ categories }: BudgetCreateProps) {

    const form = useForm(
        {
            category: '',
            amount: '',
            budget_date: '',
        }
    ) 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        form.submit(store())
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader>
                <CardTitle>Create Budget</CardTitle>
                <CardDescription>
                    Add a new budget to plan your spending and manage your finances.
                </CardDescription>

                <Separator />

                <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
                        <div className="grid gap-4">
                            <Label htmlFor="type">Budget</Label>
                            <Select value={form.data.category} onValueChange={(e) => form.setData('category', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select income type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Budget type</SelectLabel>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.category && <small className="text-red-500">{form.errors.category}</small>}
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="amount">Amount </Label>
                            <Input type="number" id="amount" name="amount" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} min="0" step="0.01" placeholder="0.00"/>
                            {form.errors.amount && <small className="text-red-500">{form.errors.amount}</small>}
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="budget_date">Budget Date </Label>
                            <Input type="date" id="budget_date" name="budget_date" value={form.data.budget_date} onChange={(e) => form.setData('budget_date', e.target.value)} />
                            {form.errors.budget_date && <small className="text-red-500">{form.errors.budget_date}</small>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" className="cursor-pointer" asChild>
                                <a href={index.url()}>
                                    Cancel
                                </a>
                            </Button>
                            <Button type="submit" className="cursor-pointer" disabled={form.processing}>
                                    {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create Budget
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    )
}