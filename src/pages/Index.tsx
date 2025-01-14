import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useState } from "react";

interface Case {
  id: number;
  client_name: string;
  case_number: string;
  description: string;
  status: string;
  created_at: string;
}

const Index = () => {
  const { toast } = useToast();
  const [newCase, setNewCase] = useState({
    client_name: "",
    case_number: "",
    description: "",
    status: "Em andamento"
  });

  const { data: cases, isLoading, refetch } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar casos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Case[];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("cases")
      .insert([newCase]);

    if (error) {
      toast({
        title: "Erro ao criar caso",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Caso criado com sucesso",
      description: "O novo caso foi adicionado ao sistema.",
    });

    setNewCase({
      client_name: "",
      case_number: "",
      description: "",
      status: "Em andamento"
    });

    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sistema de Gestão Jurídica</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Novo Caso</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="client_name">Nome do Cliente</Label>
                <Input
                  id="client_name"
                  value={newCase.client_name}
                  onChange={(e) => setNewCase({ ...newCase, client_name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="case_number">Número do Processo</Label>
                <Input
                  id="case_number"
                  value={newCase.case_number}
                  onChange={(e) => setNewCase({ ...newCase, case_number: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded"
              >
                Cadastrar Caso
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Casos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <div className="space-y-4">
                {cases?.map((case_) => (
                  <div
                    key={case_.id}
                    className="p-4 border rounded-lg hover:bg-accent"
                  >
                    <h3 className="font-semibold">{case_.client_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Processo: {case_.case_number}
                    </p>
                    <p className="text-sm">{case_.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Status: {case_.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;