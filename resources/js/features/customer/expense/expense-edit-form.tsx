import { useForm } from "@inertiajs/react"
import { index, update } from "@/routes/customer/expense"
import { ExpenseEditProps } from "@/types/customer/expense"
import { toHtmlDate } from "@/lib/utils"

import { Card, CardContent, CardDescription,
  CardHeader, CardTitle, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LoaderCircle } from "lucide-react"

export default function ExpenseEditForm({ expense, categories }: ExpenseEditProps) {
    const form = useForm(
        {
            category: expense.category_id.toString(),
            amount: expense.amount,
            expense_date: toHtmlDate(expense.expense_date),
            note: expense.note,
            receipt: null as any,
        }
    ) 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        form.submit(update(expense.id))
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader>
                <CardTitle>Edit Expense</CardTitle>
                <CardDescription>
                    Modify this expense to manage your finances effectively.
                </CardDescription>

                <Separator />

                <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
                        <div className="grid gap-4">
                            <Label htmlFor="type">Expense</Label>
                            <Select value={form.data.category} onValueChange={(e) => form.setData('category', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select expense type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Expense type</SelectLabel>
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
                            <Label htmlFor="expense_date">Date </Label>
                            <Input type="date" id="expense_date" name="expense_date" value={form.data.expense_date} onChange={(e) => form.setData('expense_date', e.target.value)} />
                            {form.errors.expense_date && <small className="text-red-500">{form.errors.expense_date}</small>}
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="note">Note</Label>
                                <Textarea id="note" name="note" placeholder="Type your notes in here" value={form.data.note} onChange={(e) => form.setData('note', e.target.value)}  />
                                {form.errors.note && <small className="text-red-500">{form.errors.note}</small>}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="receipt">Udpate Receipt (optional)</Label>
                            <Input type="file" id="receipt" name="receipt" onChange={(e) => form.setData('receipt', e.target.files?.[0] ?? null)} />
                            {form.errors.receipt && <small className="text-red-500">{form.errors.receipt}</small>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" className="cursor-pointer" asChild>
                                <a href={index.url()}>
                                    Cancel
                                </a>
                            </Button>
                            <Button type="submit" className="cursor-pointer" disabled={form.processing}>
                                {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Update Expense
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </CardHeader>
        </Card>
    )
}